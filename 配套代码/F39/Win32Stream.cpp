// Win32Stream.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include <Windows.h>

int main()
{
    std::cout << "Hello World!\n";

    auto handle = CreateFile(L"test.txt", GENERIC_READ | GENERIC_WRITE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

    printf("handle: %p", handle);
    getchar();

    while (true)
    {
        char buffer[1024] = { 0 };
        if (ReadFile(handle, buffer, 5, NULL, NULL))
        {
            printf("read: %s", buffer);
            getchar();
        }
    }
    getchar();
    CloseHandle(handle);


}
