<script>
import{mapState,mapActions} from 'pinia'
import counter from '../stores/counter.js'

export default {
    data() {
        return {
            transactionBox: "",
        }
    },
    computed:{
        ...mapState(counter,["userData"])
    },
    methods: {
        openTransaction() {
            console.log(this.userData);
            this.transactionBox.showModal()
        },
        closeTransaction() {
            this.transactionBox.close()
        }
    },
    mounted() {
        this.transactionBox = document.querySelector(".transactionBox")
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
                <p id="userName">(使用者名稱)</p>
            </div>
            <div class="balanceTitleArea">
                <p class="balanceTitle">YOUR BALANCE</p>
            </div>
            <div class="balanceTextArea">
                <p class="balanceText">$</p>
                <p id="balance" class="balanceText">(使用者剩餘金額)</p>
            </div>
        </div>
        <div class="right">
            <div class="rightTop">
                <div class="rightTopLeft">
                    <p class="rightTopLeftText">INCOME</p>
                    <p class="rightTopLeftText">$(使用者收入)</p>
                </div>
                <div class="rightTopRight">
                    <p class="rightTopRightText">EXPENSE</p>
                    <p class="rightTopRightText">$(使用者支出)</p>
                </div>
            </div>
            <div class="rightMiddle">
                <button class="addBtn" @click="this.openTransaction()">Add transaction</button>
            </div>
            <div class="rightBottom">
                <div class="showArea">

                </div>
            </div>
        </div>

        <!-- 彈跳輸入視窗 -->
        <dialog class="transactionBox">
            <i class="fa-solid fa-xmark" @click="this.closeTransaction()"></i>
            <div class="transactionSelect">
                <input type="radio" name="transactionType" class="transactionCheck firstCheck" value="income" checked>
                <p class="incomeText">收入</p>
                <input type="radio" name="transactionType" class="transactionCheck" value="expense">
                <p class="expenseText">支出</p>
            </div>
            <h3>Text</h3>
            <input class="textInput" type="text">
            <h3>Amount</h3>
            <input class="amountInput" type="number">
            <button class="addTransactionBtn" type="button">Add Transaction</button>
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
                width: 70%;
                margin-top: 2%;
                background-color: #B0C4DE;
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
}</style>