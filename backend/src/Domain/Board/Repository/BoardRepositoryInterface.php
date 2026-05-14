<?php

declare(strict_types=1);

namespace App\Domain\Board\Repository;

use App\Domain\Board\Entity\Board;

interface BoardRepositoryInterface
{
    public function findAll(): array;

    public function save(Board $board): Board;
}
