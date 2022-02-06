import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    required: true,
    example: '123-124',
    description: '방 번호',
  })
  public roomId: string;

  @ApiProperty({
    required: true,
    example: 123,
    description: '채팅 보낸 사용자 아이디',
  })
  public senderId: bigint;

  @ApiProperty({
    required: true,
    example: '안녕하세요',
    description: '채팅 내용',
  })
  public content: string;

  @ApiProperty({
    required: true,
    example: '2022-02-03T17:03:49.336763',
    description: '채팅 보낸 시간',
  })
  public sentTime: string;

  @ApiProperty({
    required: true,
    example: '김길동',
    description: '이름',
  })
  public userName: string;
}
