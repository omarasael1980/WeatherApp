import { useEffect, useState } from "react"
import Form from "./components/form/Form"
const patterns = ['bg-rumo-pattern','bg-ensenada-pattern', 'bg-tijuana-pattern']
function App() {
  const [backgroundClass, setBackgroundClass] = useState(patterns[0]);
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundClass((prevClass) => {
        const currentIndex = patterns.indexOf(prevClass);
        const nextIndex = (currentIndex + 1) % patterns.length;
        return patterns[nextIndex];
      });
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`h-screen  ${backgroundClass} bg-cover bg-center transition-background `}>
      <h1 className="text-6xl font-extrabold text-center text-white ">Weather App</h1>
       <div className="w-3/4  m-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-4 lg:mt-10">
        <p><Form/></p>
        <p>2</p>
       </div>
    </div>
  )
}

export default App
