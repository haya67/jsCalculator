$(document).ready(function(){
    
    const num_bth = document.querySelectorAll('.num_bth');
    
    // 計算結果を表示する所
    let output_sub = document.getElementById('output_sub');
    
    // 計算過程を表示するところ
    const output_total = document.getElementById('output_total');
    
    // 計算式を表す変数
    let total = 0;
    
    // // 最初の状態を定義
    let state = 'start';
    
    // 最初の整数入力モード
    let mode = 'integer_mode';
    
    
    // 1~9を押した時
    const one_nine = document.querySelectorAll ('.one_nine');
    one_nine.forEach(index => {
        index.addEventListener('click', () => {
            if(state === 'start') {
                total = index.dataset.indexId;
            }else if (state === 'finish') {
                reset();
                total = index.dataset.indexId;
            }else if (state === 'calculation' || state === 'calBtn' ) {
                total += index.dataset.indexId;
            }
            output_sub.textContent = total;
            state = 'calculation'
            changeOutput()
        });
    });
    
    
    // 0を押したとき
    const zero = document.getElementById('zero');
    zero.addEventListener('click', () => {
        if(state === 'start' || state === 'finish' || state === 'calBtn'){
            if(output_sub.textContent.slice(-1) === '0') {
                return;
            }
        }
        if(state === 'start') {
            total = zero.dataset.indexId;
        }else {
            total += zero.dataset.indexId;
        }
        output_sub.textContent = total;
    });
    
    
    // .を押したとき
    const point = document.getElementById('point');
    point.addEventListener('click' , () => {
        console.log(point.dataset.indexId)
        if(mode === 'decimal_mode') {
            return;
        }
        if (state === 'start' || state === 'finish' ) {
            total = 0;
        }else if(state = 'calBtn') {
            if(output_sub.textContent.slice(-1) !=='0'){
                total += 0;
            }
        }
        total += point.dataset.indexId
        
        output_sub.textContent = total;
        state = 'calculation';
        mode = 'decimal_mode';
        
    });
    
    // +÷-×を押したとき
    const cal = document.querySelectorAll('.cal');
    cal.forEach(index => {
        index.addEventListener('click' , () => {
            if (state === 'start') {
                return;
            }else if(state === 'calculation') {
                total += index.dataset.indexId;
            }else if(state === 'finish') {
                total = output_total.textContent;
                total += index.dataset.indexId;
                output_total.textContent = 0;
            }else if(state === 'calBtn') {
                total = total.slice(0,-1);
                total += index.dataset.indexId;
            }
            output_sub.textContent = total;
            state = 'calBtn';
            mode = 'integer_mode';
        });
    });
    
    
    
    
    // =を押した時
    const equal_btn = document.getElementById('equal_btn');
    equal_btn.addEventListener('click', () => {
        console.log(eval(total));
        output_total.textContent = eval(total);
        state = 'finish';
        mode = 'integer_mode';
        changeOutput()
    });
    
    
    // Cを押した時
    const clear = document.getElementById('clear')
    clear.addEventListener('click' , () =>{
        reset();
    });
    
    function reset() {
        total = 0;
        output_sub.textContent = 0;
        output_total.textContent = 0;
        mode = 'integer_mode';
    };
    
    
    // // 計算過程画面と計算結果画面の切り替え
    function changeOutput() {
        if (state === 'finish') {
            output_total.classList.add('active');
            output_sub.classList.remove('active');
        } else{
            output_sub.classList.add('active');
            output_total.classList.remove('active');
        }
    };
    
    
    
    
    
})


