1. 원격 저장소 복제
```
   $ git clone https://github.com/ssafy-mate/ssafy-mate_back-end_with-chatting.git
```


2. 프로젝터 폴더 > .env 파일 생성
```
DB_USER=[DB 사용자명]
DB_PASSWORD=[DB 비밀번호]
DB_DATABASE=[DB명]
PORT=[포트번호]
```

3. 프로젝터 폴더 > ormconfig.ts 파일 생성

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/entities/User';
import { ChattingRoom } from './src/entities/ChattingRoom';
import { ChattingHistory } from './src/entities/ChattingHistory';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '[호스트명]',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, ChattingRoom, ChattingHistory],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false, // ddl-auto 옵션임.
  logging: true,
  keepConnectionAlive: true,
};

export = config;
```

4. 프로젝터 폴더 > output > ormconfig.json 파일 생성
```json
[
  {
    "name": "default",
    "type": "mysql",
    "host": "[호스트명]",
    "port": 3306,
    "username": "[DB 사용자명]",
    "password": "[DB 비밀번호]",
    "database": "[DB 명]",
    "synchronize": false,
    "entities": ["entities/*.js"]
  }
]
```

5. 프로젝트 폴더 루트 경로로 이동
```
$ cd ssafy-mate_back-end_with-chatting
```

6. npm 설치
```
$ npm install
```
7. 프로젝트 빌드
```
$ npm run build
```
8. 프로젝트 시작
```
$ npm run start
```