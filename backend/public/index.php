<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use App\Application\Board\UseCase\FindAllBoardsUseCase;
use App\Infra\Database\DatabaseConnection;
use App\Infra\Repository\Board\PdoBoardRepository;
use App\Interface\Http\Controller\BoardController;
use App\Interface\Http\Response\JsonResponse;

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    if ($method === 'GET' && $uri === '/health') {
        JsonResponse::success([
            'status' => 'ok',
        ]);

        exit;
    }

    if ($method === 'GET' && $uri === '/boards') {
        $connection = DatabaseConnection::getConnection();

        $boardRepository = new PdoBoardRepository($connection);
        $findAllBoardsUseCase = new FindAllBoardsUseCase($boardRepository);
        $boardController = new BoardController($findAllBoardsUseCase);

        $boardController->index();

        exit;
    }

    JsonResponse::error([
        'error' => 'Route not found',
    ], 404);
} catch (Throwable $exception) {
    JsonResponse::error([
        'error' => 'Internal server error',
    ], 500);
}
