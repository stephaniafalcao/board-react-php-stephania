<?php

declare(strict_types=1);

namespace App\Application\Board\UseCase;

use App\Domain\Board\Repository\BoardRepositoryInterface;

final class FindAllBoardsUseCase
{
    public function __construct(
        private readonly BoardRepositoryInterface $boardRepository
    ) {}

    public function execute(): array
    {
        return $this->boardRepository->findAll();
    }
}
