/** Short CUDA/C++ lines for the landing page's scrolling code ticker — real
 *  syntax, not lorem ipsum, so it reads as authentic to anyone who knows it. */
export const cudaSnippets: string[] = [
  "__global__ void vectorAdd(float* a, float* b, float* c, int n)",
  "int idx = blockIdx.x * blockDim.x + threadIdx.x;",
  "cudaMalloc((void**)&d_data, size * sizeof(float));",
  "cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);",
  "__shared__ float tile[TILE_DIM][TILE_DIM];",
  "dim3 threadsPerBlock(16, 16);",
  "matMulKernel<<<numBlocks, threadsPerBlock>>>(A, B, C, N);",
  "__syncthreads();",
  "if (idx < n) c[idx] = a[idx] + b[idx];",
  "atomicAdd(&output[idx], value);",
  "cudaDeviceSynchronize();",
  "cudaStreamCreate(&stream);",
  "#pragma unroll",
  "nvcc -arch=sm_90 -O3 kernel.cu -o kernel",
  "cublasSgemm(handle, CUBLAS_OP_N, CUBLAS_OP_N, m, n, k, ...);",
  "warpReduceSum(val); // butterfly shuffle",
  "cudaFree(d_data);",
];

/** Keyword classes for lightweight ticker syntax highlighting — matched as
 *  whole words so `int` doesn't light up inside `threadIdx`. */
export const CUDA_KEYWORDS = [
  "__global__",
  "__shared__",
  "__syncthreads__",
  "__syncthreads",
  "dim3",
  "if",
  "int",
  "float",
  "void",
];
export const CUDA_CALLS = [
  "cudaMalloc",
  "cudaMemcpy",
  "cudaDeviceSynchronize",
  "cudaStreamCreate",
  "cudaFree",
  "cudaMemcpyHostToDevice",
  "atomicAdd",
  "cublasSgemm",
  "warpReduceSum",
  "nvcc",
];

/** Short fragments for the narrow vertical rail tickers — full lines don't
 *  fit a ~2rem-wide column, so this is single tokens/short expressions. */
export const cudaTokens: string[] = [
  "__global__",
  "__shared__",
  "__syncthreads()",
  "threadIdx.x",
  "blockIdx.x",
  "blockDim.x",
  "gridDim.x",
  "<<<N, 256>>>",
  "cudaMalloc",
  "cudaMemcpy",
  "cudaFree",
  "0x00",
  "warpSize",
  "atomicAdd",
  "__device__",
  "__constant__",
  "float4",
  "sm_90",
  "0xFF",
  "sizeof(float)",
];
