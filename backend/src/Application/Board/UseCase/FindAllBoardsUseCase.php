<?php

declare(strict_types=1);

namespace App\Application\Board\UseCase;

use App\Application\Board\DTO\BoardListItemDTO;
use App\Domain\Board\Repository\BoardRepositoryInterface;

final class FindAllBoardsUseCase
{
    public function __construct(
        private readonly BoardRepositoryInterface $boardRepository
    ) {}

    public function execute(): array
    {
        $boards = $this->boardRepository->findAll();

        return array_map(
            fn(array $board): BoardListItemDTO => $this->toBoardListItemDTO($board),
            $boards
        );
    }

    private function toBoardListItemDTO(array $board): BoardListItemDTO
    {
        return new BoardListItemDTO(
            id: (int) $board['id'],
            name: (string) $board['name'],
            description: $board['description'] === null ? null : (string) $board['description'],
            themeColor: (string) $board['themeColor'],
            icon: (string) $board['icon'],
            tasksCount: (int) $board['tasksCount'],
            completedTasksCount: (int) ($board['completedTasksCount'] ?? 0),
            pendingTasksCount: (int) ($board['pendingTasksCount'] ?? 0),
            createdAt: (string) $board['createdAt'],
        );
    }
}
