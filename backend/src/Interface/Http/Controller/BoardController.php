<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller;

use App\Application\Board\UseCase\FindAllBoardsUseCase;
use App\Interface\Http\Response\JsonResponse;
use Throwable;

final class BoardController
{
    public function __construct(
        private readonly FindAllBoardsUseCase $findAllBoardsUseCase
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
}
