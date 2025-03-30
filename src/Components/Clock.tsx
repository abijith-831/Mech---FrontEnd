import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const dateObj = new Date();
      const hour = String(dateObj.getHours()).padStart(2, '0');
      const minute = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');
      setTime(`${hour} : ${minute} : ${seconds}`);
    };

    updateTime()
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className="flex items-center rounded-2xl justify-center mb-10 bg-gray-900">
        <br /><br />
      <div className="text-4xl md:p-10 md:text-2xl lg:text-5xl font-mono text-blue-400 mb-32 mt-32 p-10 bg-black rounded-lg shadow-lg border-4 border-blue-500  max-w-xs md:max-w-md lg:max-w-lg">
        {time}
      </div>
    </div>  
  )
}

export default Clock;
