| title | prisma에서 mysql time zone 설정하기 |
| date | 2023-09-24 14:33:00 |

---
prisma 5.0 버전을 기준으로 작성되었으며, 이 글을 쓰는 시점에서 명확한 해결책은 존재하지 않는다.

## 문제상황
현재 prisma에서는 공식적으로 timezone을 지원하지 않으며 UTC로만 시간을 저장해준다. [참고](https://github.com/prisma/prisma/issues/6341)
즉, 한국에서 서비스를 하고 있다면 한국 시간대로 저장되지 않는다는 것이다.
이러한 현상이 나타나는 경우는 크게 2가지이다
* prisma schema 에서 @default(now())로 시간을 저장하는 경우
* node에서 new Date()로 생성한 시간을 prisma에 저장하는 경우

## 해결 시도 1
prisma schema에서 @default를 사용하는 경우, node에서 now()로 시간을 생성하는 것이 아니라 timezone이 적용된 db에서 now()로 시간을 생성하도록 해보자.
참고로 db의 timezone을 변경하는 방법은 아래와 같다.
```sql
-- mysql
-- 현재 시간을 한국 시간대로 생성
select convert_tz(now(), 'UTC', 'Asia/Seoul');
-- 또는
SET GLOBAL time_zone='+9:00';
SET time_zone='+9:00';
```
now()를 node가 아니라 db에서 생성하도록 해야한다고 했으므로, prisma schema에서 @default를 사용하는 경우 아래와 같이 변경해준다.
```prisma
// before
createdAt DateTime @default(now())
// after
createdAt DateTime @default(dbgenerated("now()"))
```

이렇게 할 경우, db에 설정된 timezone으로 시간이 저장되는 것을 확인할 수 있다.

하지만 여기에는 치명적인 문제가 있는데,,,
[dbgenerated로 작성된 NOW()와 CURRENT_TIMESTAMP() 관련 함수들이 schema migration 시 동일한 형태로 sync가 되지 않는 문제](https://github.com/prisma/prisma/issues/11318)와[schema와 migration된 테이블이 sync되지 않는 경우 ```ALTER TABLE``` sql 문을 ```prisma migrate dev``` 마다 생성한다는 문제](https://github.com/prisma/prisma/issues/10795)가 합쳐져서 schema에 변경사항이 없더라도 계속 migration 폴더와 파일이 생성되는 문제가 발생한다.

따라서 prisma가 위 오류를 해결해서 업데이트해주기 전까지는 dbgenerated(now())로 시간을 생성하는 방법은 사용할 수 없을 것 같다.
이 오류가 해결된다면 이 방법이 가장 좋은 timezone 설정 방법이 될 것 같다.

## 해결 시도 2
그냥 node에서 new Date()로 생성한 시간에 timezone 만큼 시간을 더하거나 빼서 prisma에 저장하는 방법이다.
prisma를 통해 db에 저장되는 시간은 UTC 시간이므로, 한국 시간대로 저장하고 싶다면 new Date()로 생성된 UTC 시간에 9시간을 더해주면 된다.

```ts
const now = new Date();
const nowInKorea = new Date(now.getTime() + 9 * 60 * 60 * 1000);
prisma.user.create({
  data: {
    //...
    createdAt: nowInKorea,
  },
});
```

물론 가지고 올 때도 마찬가지로 9시간을 빼주면 된다.
```ts
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
});
const createdAtInKorea = new Date(user.createdAt.getTime() - 9 * 60 * 60 * 1000);
```

근데 누가봐도 이쁜 프로그래밍 방식은 아니기 때문에, 맨 위의 이슈에서도 ugly hack 이라는 표현까지 써가면서, 빨리 prisma에서 공식적으로 timezone을 지원해주길 바라고 있다.
