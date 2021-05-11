


export let routes = {
    "account":{
        "create":{
            "endpoint":"/account/create",
            "request":"POST",
            "description":"create a account, plz dont use the same password that your social network",
            "exemple":{
                "login":"amazingLogin",
                "password":"wowPassword"
            }
        },
        "login":{
            "endpoint":"/account/login",
            "request":"POST",
            "description":"login in account, you will receive a token to authenticate you",
            "exemple":{
                "login":"amazingLogin",
                "password":"wowPassword"
            }
        },
        
    },
    "menu":{},
    "adventure":{},
    "travel":{},
    "character":{},
}