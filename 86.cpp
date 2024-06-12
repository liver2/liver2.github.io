#include <iostream>
#include <cmath>
#include <ctime>
#include <vector>
#include <algorithm>

double integer_lowest_length(const std::vector<int>& values) {
    double sum = 0;
    double product = 2;
    for (int x : values) {
        sum += x * x;
        product *= x;
    }

    double minimum = sum;
    for (int x : values) {
        minimum = std::min(minimum, std::sqrt(sum + (product / x)));
    }

    return minimum;
}

int main() {
    clock_t start_time = clock();
    
    int int_paths = 0;
    
    for (int M = 1; M <= 100000; ++M) {
        int c = M;
        for (int a = 1; a <= M; ++a) {
            for (int b = a; b <= M; ++b) {
                std::vector<int> values = {a, b, c};
                if (std::floor(integer_lowest_length(values)) == integer_lowest_length(values)) {
                    ++int_paths;
                }
            }
        }
        
        std::cout << int_paths << "," << M << std::endl;
        
        if (int_paths > 1000000) {
            std::cout << M << std::endl;
            break;
        }
    }
    
    double elapsed_time = double(clock() - start_time) / CLOCKS_PER_SEC;
    std::cout << "Result achieved in " << elapsed_time << " seconds" << std::endl;
    
    return 0;
}
