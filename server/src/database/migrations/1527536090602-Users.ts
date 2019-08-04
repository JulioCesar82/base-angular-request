import {MigrationInterface, QueryRunner} from 'typeorm';

// dependencies
import {User} from '../../app/user';

const crypt = User.encryptPassword('12345');

export class Users1527536090602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT into USERS
        (firstname, lastname, username, password, role) values
        ("Develop", "Orpak", "admin@orpak.com", "${crypt}", "admin"),
        ("João", "Azevedo", "frentista@example.com", "${crypt}", "frentista")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
