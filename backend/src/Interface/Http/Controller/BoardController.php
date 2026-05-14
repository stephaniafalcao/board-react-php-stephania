<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller;

use App\Application\Board\DTO\BoardListItemDTO;
use App\Application\Board\DTO\CreateBoardInputDTO;
use App\Application\Board\UseCase\CreateBoardUseCase;
use App\Application\Board\UseCase\FindAllBoardsUseCase;
use App\Domain\Board\Entity\Board;
use App\Interface\Http\Response\JsonResponse;
use InvalidArgumentException;
use JsonException;
use Throwable;

final class BoardController
{
    public function __construct(
        private readonly FindAllBoardsUseCase $findAllBoardsUseCase,
        private readonly CreateBoardUseCase $createBoardUseCase
    ) {}

    public function index(): void
    {
        try {
            $boards = $this->findAllBoardsUseCase->execute();

            JsonResponse::success([
                'data' => array_map(
                    fn(BoardListItemDTO $board): array => $this->mapToBoardListItem($board),
                    $boards
                ),
            ]);
        } catch (Throwable) {
            JsonResponse::error(
                ['error' => 'Unable to fetch boards'],
                500
            );
        }
    }


    public function save(): void
    {
        try {
            $rawPayload = file_get_contents('php://input');

            if ($rawPayload === false || trim($rawPayload) === '') {
                JsonResponse::error([
                    'error' => 'Invalid JSON payload',
                ], 400);

                return;
            }

            $payload = json_decode($rawPayload, true, 512, JSON_THROW_ON_ERROR);

            if (!is_array($payload)) {
                JsonResponse::error([
                    'error' => 'Invalid JSON payload',
                ], 400);

                return;
            }

            $input = CreateBoardInputDTO::fromArray($payload);

            $board = $this->createBoardUseCase->execute($input);

            JsonResponse::success([
                'data' => $this->mapToCreatedBoardItem($board),
            ], 201);
        } catch (JsonException) {
            JsonResponse::error([
                'error' => 'Invalid JSON payload',
            ], 400);
        } catch (InvalidArgumentException $exception) {
            JsonResponse::error([
                'error' => $exception->getMessage(),
            ], 422);
        } catch (Throwable) {
            JsonResponse::error([
                'error' => 'Unable to create board',
            ], 500);
        }
    }

    private function mapToCreatedBoardItem(Board $board): array
    {
        return [
            'id' => $board->getId(),
            'name' => $board->getName(),
            'description' => $board->getDescription(),
            'themeColor' => $board->getThemeColor(),
            'icon' => $board->getIcon(),
            'createdAt' => $board->getCreatedAt()?->format('Y-m-d H:i:s'),
            'tasksCount' => 0,
            'completedTasksCount' => 0,
            'pendingTasksCount' => 0,
        ];
    }

    private function mapToBoardListItem(BoardListItemDTO $board): array
    {
        return [
            'id' => $board->id,
            'name' => $board->name,
            'description' => $board->description,
            'themeColor' => $board->themeColor,
            'icon' => $board->icon,
            'createdAt' => $board->createdAt,
            'tasksCount' => $board->tasksCount,
            'completedTasksCount' => $board->completedTasksCount,
            'pendingTasksCount' => $board->pendingTasksCount,
        ];
    }
}
