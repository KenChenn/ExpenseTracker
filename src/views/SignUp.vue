<script>
export default{
    data(){
        return{
            account:"",
            userName:"",
            password:"",
            repeatPassword:"",
            data:{
                account:"",
                userName:"",
                password:"",
                moneyData:{
                    yourBalance:"0",
                    income:"0",
                    expense:"0",
                    transaction:[],
                },
            },
        }
    },
    methods:{
        signUp(){
            if(this.account && this.userName && this.password && this.repeatPassword){
                if(this.password == this.repeatPassword){
                    //把所有頁面變成子元件是最容易的
                    this.data.account = this.account
                    this.data.userName = this.userName
                    this.data.password = this.password
                    if(localStorage.getItem(this.account)==null){
                        localStorage.setItem(this.account,JSON.stringify(this.data))
                        this.$router.push('/')
                    }else{
                        console.log("該帳號已建立，請更換帳號");
                    }
                }else{
                    console.log("兩次密碼不相同");
                }
            }else{
                console.log("請完整輸入資料");
            }
        }
    }
}
</script>

<template>
    <div class="outer">
        <div class="box">
            <form action="">
                <h1 class="title">Sign Up</h1>
                <p class="inputHint">Account</p>
                <i class="fa-solid fa-user"></i>
                <input class="accountInput" v-model="account">
                <p class="inputHint">UserName</p>
                <input class="nameInput" v-model="userName">
                <i class="fa-solid fa-address-card"></i>
                <p class="inputHint">Password</p>
                <i class="fa-solid fa-lock fa-lock1"></i>
                <input class="passwordInput" type="password" v-model="password">
                <p class="inputHint">Repeat Password</p>
                <i class="fa-solid fa-lock fa-lock2"></i>
                <input class="repeatPasswordInput" type="password" v-model="repeatPassword">
                <button class="button_signUp" type="button" @click="this.signUp()">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .outer{
    height: 100vh;
    background-color: #B0C4DE;
    display: flex;
    align-items: center;
    justify-content: center;
    .box{
        height: 500px;
        width: 300px;
        padding: 50px;
        position:relative;
        .title{
            text-align: center;
            margin-bottom: 50px;
        }
        .inputHint{
            margin-left: 3px;
        }
        .fa-address-card{
            font-size: 22px;
            position:absolute;
            top:280px;
            left:58px;
        }
        .accountInput{
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .fa-user{
            font-size: 22px;
            position:absolute;
            top:198px;
            left:60px;
        }

        .nameInput{
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .fa-lock1{
            font-size: 22px;
            position:absolute;
            top:362px;
            left:60px;
        }

        .passwordInput{
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .fa-lock2{
            font-size: 22px;
            position:absolute;
            top:444px;
            left:60px;
        }

        .repeatPasswordInput{
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .button_signUp{
            height: 50px;
            width: 150px;
            font-size: 20px;
            border-radius: 10px;
            border: 0px;
            background-color: #40628d;
            color: white;
            position:absolute;
            top: 85%;
            left: 31%;
            }
    }
}   
</style>