<?php

declare(strict_types=1);

namespace App\Domain\Board\Repository;

interface BoardRepositoryInterface
{
    public function findAll(): array;
}
