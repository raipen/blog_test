| title | Typescript 경로 별칭 @이름 쓰기(Path Alias) |
| date | 2023-09-02 18:05:00 |

---

js/ts에서 import할 때 경로를 상대경로로 쓰는 것은 불편하다.
매번 ```../../``` 이런식으로 쓰기 귀찮고, 파일 위치가 바뀌면 수정해야 한다.
Typescript에서는 미리 프로젝트에서 중요한 폴더들을 정의해두고, 그걸로 경로를 쓰는 Path Alias 기능을 제공한다.

## Path Alias 정의
```tsconfig.json```파일의 complierOptions에 다음과 같이 설정한다.
```json
{
    "compilerOptions": {
        "baseUrl": ".", // 경로의 기준이 되는 폴더 "./src" 이런식으로 해도 됨
        "paths": {
            "@api": ["src/api"],
            "@api/*": ["src/api/*"],
            "@models": ["src/models"],
            // ...
        }
    }
}
```
