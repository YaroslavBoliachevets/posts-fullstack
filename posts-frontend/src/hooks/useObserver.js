import { useRef, useEffect } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
	const observer = useRef();
	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();

		const cb = (enties) => {
			if (enties[0].isIntersecting && canLoad) {
				// console.log("див в зоне видимости", observer.current);
				callback();
			}
		};

		observer.current = new IntersectionObserver(cb);
		observer.current.observe(ref.current);
	}, [isLoading]);
};

// useRef() коробочка в которую React кладёт значение и не трогает его при перерендерах. создает объект { current: undefined }
// ref эл за которым наблюдаем
// отключаем наблюдателя с прошлой загрузки, в конце вызовем нового
// если появляется блок за которым следим и еще есть что подгружать
// вешаем наблюдателя ипри появлении на экране эл-та вызываем колбек
