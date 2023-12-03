<script>

export default{
    data(){
        return{
            accountInput:"",
            passwordInput:"",
            data:"",
        }
    },
    methods:{
        signUp(){ //函式_導入註冊分頁
            this.$router.push('/SignUp') 
        },
        logIn(){ //函式_登入
            if(localStorage.getItem(this.accountInput)!=null){
                this.data=JSON.parse(localStorage.getItem(this.accountInput))
                if(this.data.password == this.passwordInput){
                    console.log("成功登入");
                    this.$router.push({
                        name: 'ExpenseTracker',
                        state:{
                            name:JSON.stringify(this.accountInput)
                        }
                    }) 
                }else{
                    console.log("密碼錯誤");
                }
            }else{
                console.log("該帳號尚未建立");
            }


            // this.$router.push('/ExpenseTracker') 
        },
    },
}
</script>

<template>

    <div class="outer">
        <div class="box">
            <form>
                <h1 class="title">記帳程式</h1>
                <p class="inputHint">Account</p>
                <i class="fa-regular fa-envelope"></i>
                <input class="accountInput" v-model="accountInput">
                <p class="inputHint">Password</p>
                <i class="fa-solid fa-lock"></i>
                <input class="passwordInput" type="password" v-model="passwordInput">
                <div class="bottom">
                    
                </div>
                <button class="button_signUp" type="button" @click="this.signUp()">Sign Up</button>
                <button class="button_logIn" type="button" @click="this.logIn()">Log In</button>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
body {
    margin: 0px;
}

.outer {
    height: 100vh;
    background-color: #B0C4DE;
    display: flex;
    align-items: center;
    justify-content: center;

    .box {
        height: 500px;
        width: 300px;
        padding: 50px;
        position: relative;

        .title {
            text-align: center;
            margin-bottom: 50px;
        }

        .inputHint {
            margin-left: 3px;
        }

        .fa-regular {
            font-size: 22px;
            position: absolute;
            top: 202px;
            left: 15%;
        }

        .fa-lock{
            font-size: 22px;
            position: absolute;
            top: 284px;
            left: 15%;
        }
        
        .accountInput {
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .passwordInput {
            height: 30px;
            width: 100%;
            border-radius: 10px;
            border: 0px;
            text-indent: 13%
        }

        .bottom {
            display: flex;
            align-items: center;
            margin-top: 3px;

            .checkBox {
                height: 20px;
                width: 20px;
                margin-top: 16px;
                margin-bottom: 16px;
                margin-left: 3px;
            }

            .text_keepLogin {
                margin-left: 3px;
            }
        }
        .button_signUp {
            height: 35px;
            width: 120px;
            font-size: 20px;
            border-radius: 10px;
            border: 0px;
            background-color: #40628d;
            color: white;
            position: absolute;
            top: 59%;
            left: 15%;
        }
        .button_logIn {
            height: 35px;
            width: 120px;
            font-size: 20px;
            border-radius: 10px;
            border: 0px;
            background-color: #40628d;
            color: white;
            position: absolute;
            top: 59%;
            left: 55%;
        }
    }
}</style>
