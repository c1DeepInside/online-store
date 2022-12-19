// Type Any is justified because we can debounce any function, with
// any arguments and any return type. We narrow the type down by utilizing generics
export const debounce = <F extends (...args: any) => any>(
    func: F,
    waitFor: number,
  ) => {
    let timeout: NodeJS.Timeout;
  
    const debounced = (...args: any) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), waitFor)
    }
  
    return debounced as (...args: Parameters<F>) => ReturnType<F>
  }