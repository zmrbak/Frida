// F20.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>

int main()
{
    std::cout << "打回车，继续1，程序奔溃!\n";
    getchar();

    int* pointer = (int*)0;
    pointer[0] = 123;


    std::cout << "打回车，继续2，程序奔溃!\n";
    getchar();
}
