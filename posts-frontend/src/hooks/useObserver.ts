import React, { useRef, useEffect } from "react";

export const useObserver = (
	ref: React.RefObject<HTMLElement | null>,
	canLoad: boolean,
	isLoading: boolean,
	callback: () => void,
): void => {
	const observer = useRef<IntersectionObserver | null>(null);
	useEffect(() => {
		// при подгрузке новых списков / изм зависимости
		if (isLoading) return;
		// мы удаляем старый налюдатель
		if (observer.current) observer.current.disconnect();

		// браузер передает в entries массив эл за которыми мы следим, он всего 1 по этому берем [0]
		const cb = (entries: IntersectionObserverEntry[]) => {
			// isIntersecting становится тру когда эл появляется на экране и если можно подгружаем след страничку
			if (entries[0].isIntersecting && canLoad) {
				// console.log("див в зоне видимости", observer.current);
				callback();
			}
		};

		// создаем новый экземпляр и начинаем следать за ref.current
		observer.current = new IntersectionObserver(cb);
		if (ref.current) {
			observer.current.observe(ref.current);
		}
	}, [isLoading, canLoad]);
};

// useRef() коробочка в которую React кладёт значение и не трогает его при перерендерах. создает объект { current: undefined }
// ref эл за которым наблюдаем
// отключаем наблюдателя с прошлой загрузки, в конце вызовем нового
// если появляется блок за которым следим и еще есть что подгружать
// вешаем наблюдателя ипри появлении на экране эл-та вызываем колбек
