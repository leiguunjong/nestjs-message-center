import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabasesSchema1777354489208 implements MigrationInterface {
    name = 'InitDatabasesSchema1777354489208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_message_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isRead\` tinyint NOT NULL DEFAULT 0, \`userId\` int NOT NULL, \`messageId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2d5d5fcc316fa79d11318455cf\` (\`userId\`, \`messageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_message_status\` ADD CONSTRAINT \`FK_f1dc42ab7752eae68f8a958338d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_message_status\` ADD CONSTRAINT \`FK_7b9fe1ffc72350cefbec68cfc0f\` FOREIGN KEY (\`messageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_message_status\` DROP FOREIGN KEY \`FK_7b9fe1ffc72350cefbec68cfc0f\``);
        await queryRunner.query(`ALTER TABLE \`user_message_status\` DROP FOREIGN KEY \`FK_f1dc42ab7752eae68f8a958338d\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d5d5fcc316fa79d11318455cf\` ON \`user_message_status\``);
        await queryRunner.query(`DROP TABLE \`user_message_status\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
