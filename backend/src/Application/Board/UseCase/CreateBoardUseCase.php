<?php

declare(strict_types=1);

namespace App\Application\Board\UseCase;

use App\Application\Board\DTO\CreateBoardInputDTO;
use App\Domain\Board\Entity\Board;
use App\Domain\Board\Repository\BoardRepositoryInterface;

final class CreateBoardUseCase
{
    public function __construct(
        private readonly BoardRepositoryInterface $boardRepository
    ) {}

    public function execute(
        CreateBoardInputDTO $input
    ): Board
    {
        $board = new Board(
            id: null,
            name: $input->name,
            description: $input->description,
            themeColor: $input->themeColor,
            icon: $input->icon
        );

        return $this->boardRepository->save($board);
    }
}
