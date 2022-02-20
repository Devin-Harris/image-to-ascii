export async function waitTickAmount(tickAmount: number, tickCount = 0): Promise<any> {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(async () => {
      if (tickCount < tickAmount) {
        await waitTickAmount(tickAmount, tickCount += 1)
      }
      resolve(1)
    })
  })
}