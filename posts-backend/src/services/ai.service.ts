import { createGoogleGenerativeAI, google } from "@ai-sdk/google"; // Инициализация провайдера
import { generateText, Output } from "ai";
import { z } from "zod";

const googleProvider = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export class AIService {
	static async AnalyzePostContent(title: string, body: string) {
		try {
			const { output } = await generateText({
				model: google("gemini-2.5-flash"),
				output: Output.object({
					schema: z.object({
						tags: z
							.array(z.string().max(15))
							.max(5)
							.describe(
								"Массив из 3-5 релевантных тегов к тексту. Писать только на языке оригинала поста.",
							),
					}),
				}),
				prompt: `Проанализируй пост для блога. Заголовок: "${title}". Текст публикации: "${body}". Сгенерируй теги.`,
			});
			return output;
		} catch (error) {
			console.error("Ошибка AI-сервиса:", error);
			return { tags: [] };
		}

		// try {
		// 	await new Promise((resolve) => setTimeout(resolve, 500));

		// 	console.log("=== ИИ-сервис запущен в режиме симуляции ===");

		// 	// Возвращаем тестовые теги, как будто их придумал Gemini
		// 	return {
		// 		tags: ["node", "typescript", "backend"],
		// 	};
		// } catch (error) {
		// 	console.error("Ошибка AI-сервиса:", error);
		// 	return { tags: [] };
		// }
	}
}
