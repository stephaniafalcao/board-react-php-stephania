<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller;

use App\Application\Board\DTO\CreateBoardInputDTO;
use App\Application\Board\UseCase\CreateBoardUseCase;
use App\Application\Board\UseCase\FindAllBoardsUseCase;
use App\Domain\Board\Entity\Board;
use App\Interface\Http\Response\JsonResponse;
use InvalidArgumentException;
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
                'data' => $boards,
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
            $payload = json_decode(
                file_get_contents('php://input'),
                true,
                512,
                JSON_THROW_ON_ERROR
            );

            $input = CreateBoardInputDTO::fromArray($payload);

            $board = $this->createBoardUseCase->execute($input);

            JsonResponse::success([
                'data' => $this->mapToCreatedBoardItem($board),
            ], 201);
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
}
