export const formatTemperature = (temp: number) :number => {
    const celsius = temp - 273.15

    return  Number(celsius.toFixed(2))
}