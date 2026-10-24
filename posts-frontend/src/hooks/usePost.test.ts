import { renderHook } from "@testing-library/react";
import { usePosts, useSortedPosts } from "./usePost";
import { IPost } from "../models/IPost";

const mockPosts: IPost[] = [
	{
		id: 1,
		title: "Beta Post",
		body: "Z-body text",
		createdAt: "2026-01-01",
		userId: 1,
		tags: [],
		user: { email: "test@test.com" },
		_count: { comments: 0 },
	},
	{
		id: 2,
		title: "Alpha Post",
		body: "A-body text",
		createdAt: "2026-01-02",
		userId: 1,
		tags: [],
		user: { email: "test@test.com" },
		_count: { comments: 0 },
	},
];

describe(" useSortedPosts Hook (Сортировка)", () => {
	test("должен возвращать исходный массив если сортировка пустая", () => {
		const { result } = renderHook(() => useSortedPosts(mockPosts, ""));
		expect(result.current).toEqual(mockPosts);
	});

	test("должен правильно отсортировать массив по полю title", () => {
		const { result } = renderHook(() => useSortedPosts(mockPosts, "title"));
		expect(result.current[0].title).toBe("Alpha Post");
		expect(result.current[1].title).toBe("Beta Post");
	});

	test("должен правильно отсортировать по полю body", () => {
		const { result } = renderHook(() => useSortedPosts(mockPosts, "body"));
		expect(result.current[0].body).toBe("A-body text");
		expect(result.current[1].body).toBe("Z-body text");
	});
});

describe("usePosts Hook (Фильтрация и поиск)", () => {
	test("должен фильтровать посты по совпадению в заголовке title", () => {
		const { result } = renderHook(() => usePosts(mockPosts, "", "alpha"));

		expect(result.current.length).toBe(1);
		expect(result.current[0].title).toBe("Alpha Post");
	});

	test("должен возвращать пустой массивб если совпадений нет", () => {
		const { result } = renderHook(() =>
			usePosts(mockPosts, "", "long text to find nothing"),
		);
		expect(result.current.length).toBe(0);
	});

	test("должен отфильтровать и отсортировать посты", () => {
		const { result } = renderHook(() => usePosts(mockPosts, "body", "post"));
		expect(result.current.length).toBe(2);
		expect(result.current[0].body).toBe("A-body text");
		expect(result.current[1].body).toBe("Z-body text");
	});
});
