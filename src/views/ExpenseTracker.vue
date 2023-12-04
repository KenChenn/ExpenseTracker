<script>
import{mapState,mapActions} from 'pinia'
import counter from '../stores/counter.js'


export default {
    data() {
        return {
            transactionBox: "",
            deleteBox:"",
            loginUserData:"",
            addTransactionText:"",
            addTransactionAmount:"",
            textInput:"",
            amountInput:"",
            formatamountInput:"",
            incomeCheck:"",
            expenseCheck:"",
            internationalNumberFormat:new Intl.NumberFormat('en-US'),
            deleteIndexNow:"",
        }
    },
    computed:{
        ...mapState(counter,["userData"])
    },
    methods: {
        openTransaction() {
            this.transactionBox.showModal()
        },
        closeTransaction() {
            this.transactionBox.close()
        },
        addTransaction(){
            if(this.textInput.value!="" && this.amountInput.value!=""){
                switch(true){
                    case this.incomeCheck.checked == true:
                        this.formatamountInput = parseFloat(this.amountInput.value).toFixed(2)
                        this.loginUserData.moneyData.income =  parseFloat(this.loginUserData.moneyData.income) + parseFloat(this.formatamountInput)
                        this.loginUserData.moneyData.yourBalance = parseFloat(this.loginUserData.moneyData.yourBalance) + parseFloat(this.formatamountInput)
                        this.loginUserData.moneyData.transaction.push({type:"income",text:this.textInput.value,amount:this.formatamountInput})
                        localStorage.setItem(this.loginUserData.account,JSON.stringify(this.loginUserData))
                        this.textInput.value=""
                        this.amountInput.value=""
                        this.closeTransaction()
                        break;
                    case this.expenseCheck.checked == true:
                        this.formatamountInput = parseFloat(this.amountInput.value).toFixed(2)
                        this.loginUserData.moneyData.expense = parseFloat(this.loginUserData.moneyData.expense) +  parseFloat(this.formatamountInput)
                        this.loginUserData.moneyData.yourBalance = parseFloat(this.loginUserData.moneyData.yourBalance) - parseFloat(this.formatamountInput)
                        this.loginUserData.moneyData.transaction.push({type:"expense",text:this.textInput.value,amount:this.formatamountInput})
                        localStorage.setItem(this.loginUserData.account,JSON.stringify(this.loginUserData))
                        this.textInput.value=""
                        this.amountInput.value=""
                        this.closeTransaction()
                        break;
                }
            }else{
                window.alert("請輸入內容及金額")
            }
        },
        openDelete(index){
            this.deleteBox.showModal()
            this.deleteIndexNow = index
        },
        closeDelete(){
            this.deleteBox.close()
        },
        delete(){
            switch(this.loginUserData.moneyData.transaction[this.deleteIndexNow].type){
                case "income":
                    console.log("income");
                    this.loginUserData.moneyData.income = parseFloat(this.loginUserData.moneyData.income) - parseFloat(this.loginUserData.moneyData.transaction[this.deleteIndexNow].amount)
                    this.loginUserData.moneyData.yourBalance = parseFloat(this.loginUserData.moneyData.yourBalance) - parseFloat(this.loginUserData.moneyData.transaction[this.deleteIndexNow].amount)
                    this.loginUserData.moneyData.transaction.splice(this.deleteIndexNow,1)
                    localStorage.setItem(this.loginUserData.account,JSON.stringify(this.loginUserData))
                    this.deleteIndexNow =""
                    this.closeDelete()
                    break;
                case "expense":
                    console.log("expense");
                    this.loginUserData.moneyData.expense = parseFloat(this.loginUserData.moneyData.expense) - parseFloat(this.loginUserData.moneyData.transaction[this.deleteIndexNow].amount)
                    this.loginUserData.moneyData.yourBalance = parseFloat(this.loginUserData.moneyData.yourBalance) + parseFloat(this.loginUserData.moneyData.transaction[this.deleteIndexNow].amount)
                    this.loginUserData.moneyData.transaction.splice(this.deleteIndexNow,1)
                    localStorage.setItem(this.loginUserData.account,JSON.stringify(this.loginUserData))
                    this.deleteIndexNow =""
                    this.closeDelete()
                    break;
            }
        }
    },
    created(){
        this.loginUserData = JSON.parse(localStorage.getItem(JSON.parse(history.state.name)))
    },
    mounted() {
        this.transactionBox = document.querySelector(".transactionBox")
        this.deleteBox = document.querySelector(".deleteBox")
        this.textInput = document.querySelector(".textInput")
        this.amountInput = document.querySelector(".amountInput")
        this.incomeCheck = document.querySelector("#icomeCheck")
        this.expenseCheck = document.querySelector("#expenseCheck")
    },
}
</script>

<template>
    <div class="outer">
        <div class="left">
            <div class="titleArea">
                <p>Expense Tracker</p>
            </div>
            <div class="userNameArea">
                <p id="userName" v-bind:innerText="loginUserData.userName">(使用者名稱)</p>
            </div>
            <div class="balanceTitleArea">
                <p class="balanceTitle">YOUR BALANCE</p>
            </div>
            <div class="balanceTextArea">
                <p id="balance" class="balanceText" v-bind:innerText='"$" + internationalNumberFormat.format(loginUserData.moneyData.yourBalance)'>(使用者剩餘金額)</p>
            </div>
        </div>
        <div class="right">
            <div class="rightTop">
                <div class="rightTopLeft">
                    <p class="rightTopLeftText">INCOME</p>
                    <p class="rightTopLeftText" v-bind:innerText='"$" + internationalNumberFormat.format(loginUserData.moneyData.income)'>$(使用者收入)</p>
                </div>
                <div class="rightTopRight">
                    <p class="rightTopRightText">EXPENSE</p>
                    <p class="rightTopRightText" v-bind:innerText='"$" + internationalNumberFormat.format(loginUserData.moneyData.expense)'>$(使用者支出)</p>
                </div>
            </div>
            <div class="rightMiddle">
                <button class="addBtn" @click="this.openTransaction()">Add transaction</button>
            </div>
            <div class="rightBottom">
                <div class="showArea">
                    <div class="transactionData" v-for="(item,index) in loginUserData.moneyData.transaction">
                        <p class="transactionDataText">{{ item.text }}</p>
                        <p class="transactionDataAmount" v-if='item.type == "income"' style="color:#00A600">${{ item.amount }}</p>
                        <p class="transactionDataAmount" v-if='item.type == "expense"' style="color:red">${{ item.amount }}</p>
                        <button class="transactionDataDelete" type="button" @click="this.openDelete(index)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 彈跳輸入視窗 -->
        <dialog class="transactionBox">
            <i class="fa-solid fa-xmark" @click="this.closeTransaction()"></i>
            <div class="transactionSelect">
                <input id="icomeCheck" type="radio" name="transactionType" class="transactionCheck firstCheck"  value="income" checked >
                <p class="incomeText">收入</p>
                <input id="expenseCheck" type="radio" name="transactionType" class="transactionCheck" value="expense" >
                <p class="expenseText">支出</p>
            </div>
            <h3>Text</h3>
            <input class="textInput" type="text">
            <h3>Amount</h3>
            <input class="amountInput" type="number">
            <button class="addTransactionBtn" type="button" @click="this.addTransaction()">Add Transaction</button>
        </dialog>

        <dialog class="deleteBox">
            <i class="fa-solid fa-xmark" @click="this.closeDelete()"></i>
            <p>Sure to Delete?</p>
            <button class="deleteBoxBtn" type="button" @click="this.delete()">Delete</button>
        </dialog>

    </div>
</template>

<style scoped lang="scss">
.outer {
    height: 100vh;
    width: 100vw;
    display: flex;

    .left {
        height: 100%;
        width: 30%;
        background-color: #B0C4DE;

        .titleArea {
            height: 30%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .userNameArea {
            height: 20%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .balanceTitleArea {
            height: 5%;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .balanceTextArea {
            height: 45%;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }

    .right {
        height: 100%;
        width: 70%;

        .rightTop {
            height: 30%;
            width: 100%;
            display: flex;

            .rightTopLeft {
                height: 100%;
                width: 50%;

                .rightTopLeftText {
                    margin-bottom: 0px;
                    margin-top: 9%;
                    text-align: center;
                    color: #00A600;
                }
            }

            .rightTopRight {
                height: 100%;
                width: 50%;

                .rightTopRightText {
                    margin-bottom: 0px;
                    margin-top: 9%;
                    text-align: center;
                    color: red;
                }
            }
        }

        .rightMiddle {
            height: 10%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .addBtn {
                height: 60%;
                width: 22%;
                background-color: #B0C4DE;
                border: 0px;
                border-radius: 10px;
            }
        }

        .rightBottom {
            height: 60%;
            width: 100%;
            display: flex;
            justify-content: center;

            .showArea {
                height: 90%;
                width: 50%;
                margin-top: 2%;
                overflow:auto;  
                .transactionData{
                    height:9%;
                    width: 99%;
                    border:2px solid #B0C4DE;
                    margin-top: 2%;
                    border-radius: 8px;
                    position:relative;
                    .transactionDataText{
                        font-size: 20px;
                        margin: 0;
                        position:absolute;
                        top:16%;
                        left:5%;
                    }
                    .transactionDataAmount{
                        font-size: 20px;
                        margin: 0;
                        position:absolute;
                        top:16%;
                        right:15%;
                        
                    }
                    .transactionDataDelete{
                        height: 60%;
                        border: 0px;
                        border-radius: 5px;
                        background-color: #B0C4DE;
                        position:absolute;
                        top:18%;
                        right:2%;
                    }
                }
            }
        }
    }

    p {
        font-size: 28px;
    }

    .transactionBox {
        height: 55%;
        width: 35%;
        border-radius: 20px;
        border: 0px;
        position: relative;

        .fa-solid {
            font-size: 26px;
            position: absolute;
            right: 25px;
            top: 20px;
        }

        .transactionSelect {
            width: 100%;
            display: flex;
            .transactionCheck {
                zoom:120%;
                margin-left: 5%;
                margin-right: 1%;
            }
            .firstCheck{
                margin-left: 35%;
            }

            .incomeText {
                font-size: 22px;
                color: #00A600;
            }

            .expenseText {
                font-size: 22px;
                color: red;
            }
        }

        .addTransactionBtn {
            height: 12%;
            width: 25%;
            margin-top: 9%;
            margin-bottom: 3%;
            margin-left: 38%;
            border-radius: 20px;
            background-color: #B0C4DE;
            border: 0px;
        }

        h3 {
            margin-top: 3%;
            margin-bottom: 3%;
            margin-left: 35%;
        }
        .textInput{
            height: 6%;
            display: block;
            margin-left: 35%;
        }
        .amountInput{
            height: 6%;
            display: block;
            margin-left: 35%;
        }
    }
    .deleteBox{
        height: 35%;
        width: 20%;
        border-radius: 20px;
        border: 0px;
        position: relative;
        .fa-solid {
            font-size: 26px;
            position: absolute;
            right: 25px;
            top: 20px;
        }
    }
}</style>