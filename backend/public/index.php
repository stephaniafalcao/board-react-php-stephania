<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use App\Application\Board\UseCase\FindAllBoardsUseCase;
use App\Application\Board\UseCase\CreateBoardUseCase;
use App\Application\Task\UseCase\UpdateTaskStatusUseCase;
use App\Infra\Database\DatabaseConnection;
use App\Infra\Repository\Board\PdoBoardRepository;
use App\Infra\Repository\Task\PdoTaskRepository;
use App\Interface\Http\Controller\BoardController;
use App\Interface\Http\Controller\TaskController;
use App\Interface\Http\Response\JsonResponse;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = is_string($uri) ? $uri : '/';

$boardControllerFactory = static function (): BoardController {
    static $boardController = null;

    if ($boardController instanceof BoardController) {
        return $boardController;
    }

    $connection = DatabaseConnection::getConnection();
    $boardRepository = new PdoBoardRepository($connection);

    $findAllBoardsUseCase = new FindAllBoardsUseCase($boardRepository);
    $createBoardUseCase = new CreateBoardUseCase($boardRepository);

    $boardController = new BoardController(
        $findAllBoardsUseCase,
        $createBoardUseCase
    );

    return $boardController;
};

$taskControllerFactory = static function (): TaskController {
    static $taskController = null;

    if ($taskController instanceof TaskController) {
        return $taskController;
    }

    $connection = DatabaseConnection::getConnection();
    $taskRepository = new PdoTaskRepository($connection);

    $updateTaskStatus = new UpdateTaskStatusUseCase($taskRepository);


    $taskController = new TaskController(
        $updateTaskStatus
    );

    return $taskController;
};

$routeKey = sprintf('%s %s', $method, $path);

try {
    $routes = [
        'GET /health' => static function (): void {
            JsonResponse::success([
                'status' => 'ok',
            ]);
        },
        'GET /boards' => static function () use ($boardControllerFactory): void {
            $boardControllerFactory()->index();
        },
        'POST /boards' => static function () use ($boardControllerFactory): void {
            $boardControllerFactory()->save();
        },
        'PATCH /tasks' => static function () use ($taskControllerFactory): void {
            $taskControllerFactory()->updateStatus();
        },
    ];

    if (!array_key_exists($routeKey, $routes)) {
        JsonResponse::error([
            'error' => 'Route not found',
        ], 404);

        exit;
    }

    $routes[$routeKey]();
} catch (Throwable $exception) {
    JsonResponse::error([
        'error' => 'Internal server error',
    ], 500);
}
