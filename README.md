민영 3000원

나 12000원

재연 15000원을 썼다고 가정하자.

민영 3000원

나 -> 민영 1000원
재연 -> 민영 1000원

나 12000원

민영 -> 나 4000원
재연 -> 나 4000원

재연 15000원

나 -> 재연 5000원
민영 -> 재연 5000원

나의 계좌
b: -1000
b: +4000
c: +4000
c: -5000

--> b: 3000 c: -1000

데이터형식은

{
"준석": {
"재연": -1000,
"민영": +3000
},
"민영": {

    }

}

하나의 리스트
[{user, expense}]

가 있으면
본 user의 객체에는 다른 user들에게 expense/groupmembers.length - 1을 더하고

다른 user들의 객체에는 그 user에 해당하는 객체에게 +1을 하게 해주는

이런식으로 담기도록.
