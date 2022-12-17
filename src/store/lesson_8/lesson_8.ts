// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
const rest = nums.reduce((acc, el)=>acc +el)
    console.log(nums)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return rest
}

// let sum = 0
// nums.forEach(num => sum += num)
// return sum


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
    let triangleType = a + b > c && b + c > a && a + c > b

    if (a === b && a === c) {
        return "10"
    } else if (triangleType && (a === b || a === c || c === b)) {
        return "01"
    } else if (triangleType) {
        return "11"
    } else if (!triangleType)
        return "00"

   /* let triangle = a + b > c && a + c > b && b + c > a
    if (a === b && b === c) {
        return '10'
    }else if (triangle && (a === b ||  b === c || c === a)) {
        return '01'
    } else if (triangle) {
        return '11'
    } else if (!triangle)
        return '00'*/

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return ""
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
        const string = `${number}`;
        const arr = string.split('')
        const res = arr.reduce((acc, el) => acc + +el,0)
        return res;

    console.log(getSum(324))

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался

}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let numEven = 0;
    let numOdd = 0;
    for(let i = 0; i < arr.length; i++) {
        if (i % 2 === 0 || i === 0) {
            numEven = numEven + arr[i];
        } else {
            numOdd = numOdd + arr[i]
        }
    }
    if (numEven < numOdd) {
        return false;
    }
        return true;
    }
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался


// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    let arr = [...array];
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        if(Number.isInteger((arr[i])) && arr[i] > 0) {
            let squareNum = arr[i] * arr[i]
            newArr.push(squareNum)
        }
    }
    return newArr;
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return []
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return 0
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}