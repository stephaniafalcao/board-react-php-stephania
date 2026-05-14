<?php

declare(strict_types=1);

namespace App\Infra\Repository\Board;

use App\Domain\Board\Entity\Board;
use App\Domain\Board\Repository\BoardRepositoryInterface;
use DateTimeImmutable;
use PDO;
use PDOException;
use RuntimeException;

final class PdoBoardRepository implements BoardRepositoryInterface
{
    public function __construct(
        private readonly PDO $connection
    ) {}

    public function findAll(): array
    {
        $sql = "
            SELECT
                b.id,
                b.name,
                b.description,
                b.theme_color,
                b.icon,
                b.created_at,
                COUNT(t.id) AS tasks_count,
                COUNT(CASE WHEN t.status = 'done' THEN 1 END) AS completed_tasks_count,
                COUNT(CASE WHEN t.status <> 'done' THEN 1 END) AS pending_tasks_count
            FROM board b
            LEFT JOIN task t ON t.board_id = b.id
            GROUP BY
                b.id,
                b.name,
                b.description,
                b.theme_color,
                b.icon,
                b.created_at
            ORDER BY b.created_at DESC
        ";

        try {
            $statement = $this->connection->prepare($sql);
            $statement->execute();

            $boards = $statement->fetchAll(PDO::FETCH_ASSOC);

            return array_map(
                fn(array $board): array => $this->mapToBoardListItem($board),
                $boards
            );
        } catch (PDOException $exception) {
            throw new RuntimeException(
                'Unable to fetch boards.',
                previous: $exception
            );
        }
    }

    public function save(
        Board $board
    ): Board
    {
        $sql = '
            INSERT INTO board (
                name,
                description,
                theme_color,
                icon,
                created_at,
                updated_at
            ) VALUES (
                :name,
                :description,
                :themeColor,
                :icon,
                CURRENT_TIMESTAMP,
                NULL
            )
            RETURNING
                id,
                name,
                description,
                theme_color,
                icon,
                created_at
        ';

        try {
            $statement = $this->connection->prepare($sql);
            $statement->execute([
                'name' => $board->getName(),
                'description' => $board->getDescription(),
                'themeColor' => $board->getThemeColor(),
                'icon' => $board->getIcon(),
            ]);

            $createdBoard = $statement->fetch(PDO::FETCH_ASSOC);

            if ($createdBoard === false) {
                throw new RuntimeException('Unable to create board.');
            }

            return $this->mapToBoardEntity($createdBoard);
        } catch (PDOException $exception) {
            throw new RuntimeException(
                'Unable to create board.',
                previous: $exception
            );
        }
    }

    private function mapToBoardListItem(array $board): array
    {
        return [
            'id' => (int) $board['id'],
            'name' => $board['name'],
            'description' => $board['description'],
            'themeColor' => $board['theme_color'],
            'icon' => $board['icon'],
            'createdAt' => $board['created_at'],
            'tasksCount' => (int) $board['tasks_count'],
            'completedTasksCount' => (int) $board['completed_tasks_count'],
            'pendingTasksCount' => (int) $board['pending_tasks_count'],
        ];
    }

    private function mapToBoardEntity(array $board): Board
    {
        return new Board(
            id: (int) $board['id'],
            name: (string) $board['name'],
            description: $board['description'] === null ? null : (string) $board['description'],
            themeColor: (string) $board['theme_color'],
            icon: (string) $board['icon'],
            createdAt: new DateTimeImmutable((string) $board['created_at']),
            updatedAt: null
        );
    }
}
