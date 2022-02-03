import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    required: true,
    example: '123-124',
    description: '방 번호',
  })
  private roomId: string;

  @ApiProperty({
    required: true,
    example: 123,
    description: '채팅 보낸 사용자 아이디',
  })
  private senderId: bigint;

  @ApiProperty({
    required: true,
    example: '안녕하세요',
    description: '채팅 내용',
  })
  private content: string;

  @ApiProperty({
    required: true,
    example: '2022~~~~~',
    description: '채팅 보낸 시간',
  })
  private sentTime: string;
}
