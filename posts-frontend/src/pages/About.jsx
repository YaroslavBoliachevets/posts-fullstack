import React, { useState } from "react";
import cl from "./About.module.css";

function About() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqData = [
		{
			title: "🌐 1. General Project Overview & Tech Stack",
			content: (
				<>
					<p>
						A production-ready Fullstack Single Page Application (SPA) engineered to
						showcase enterprise architectural patterns, declarative routing, and
						predictable state orchestration.
					</p>
					<div className={cl.techBadges}>
						<span className={cl.badge}>React 19</span>
						<span className={cl.badge}>React Router v7</span>
						<span className={cl.badge}>MobX Engine</span>
						<span className={cl.badge}>TypeScript (BE)</span>
						<span className={cl.badge}>PostgreSQL</span>
						<span className={cl.badge}>Prisma ORM</span>
						<span className={cl.badge}>Motion v12</span>
						<span className={cl.badge}>Zod / Validator</span>
						<span className={cl.badge}>CSS Modules</span>
					</div>
				</>
			),
		},
		{
			title: "🏗️ 2. Enterprise Layered Architecture (Controller-Service-DTO)",
			content: (
				<>
					<p>
						The server application abandons chaotic script chains in favor of a
						strictly decoupled, highly maintainable{" "}
						<strong>Layered Architecture</strong> pattern (Express v5 + TypeScript).
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Routing Layer:</strong> Independent Express router engines (
							<code>postsRouter</code>, <code>userRouter</code>,{" "}
							<code>commentsRouter</code>) isolated under a unified API root.
						</li>
						<li>
							<strong>Controller Layer:</strong> Handles incoming HTTP state
							translations, delegates domain operations, and acts as the gatekeeper for
							network request lifecycles.
						</li>
						<li>
							<strong>Business Logic (Services):</strong> Pure, decoupled service
							singletons executing core tasks (e.g., token cryptography, post
							processing) independent of the HTTP wrapper.
						</li>
						<li>
							<strong>Data Transfer Objects (DTOs):</strong> Implements strict data
							serialization models to sanitize network layers, ensuring zero leakage of
							internal database structures or private fields back to the client.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "🗄️ 3. Relational Database Design & Prisma ORM",
			content: (
				<>
					<p>
						The data layer runs on a highly organized PostgreSQL environment
						communicating via a type-safe declarative <strong>Prisma Client</strong>.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Data Relations:</strong> Structured clean 1:Many links (User →
							Posts → Comments) and a precise 1:1 token session mapping.
						</li>
						<li>
							<strong>Many-to-Many Optimization:</strong> Implemented an explicit
							junction model <code>PostTag</code> using composite keys{" "}
							<code>@@id([postId, tagId])</code> for lightning-fast indexing and query
							resolution.
						</li>
						<li>
							<strong>Referential Integrity:</strong> Enforced strict{" "}
							<code>onDelete: Cascade</code> rules to automatically prune orphaned
							database entries upon main record deletion.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "🤖 4. Generative AI Integration & Smart Services",
			content: (
				<>
					<p>
						The application features advanced cloud-native intelligence layers powered
						by the <strong>Vercel AI SDK</strong> and{" "}
						<strong>Google Gemini Pro infrastructure</strong>.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>AI-Assisted Operations:</strong> Encapsulated within a dedicated{" "}
							<code>ai.service.ts</code> to deliver contextual content features,
							automated text expansions, or smart automated post tagging based on
							context.
						</li>
						<li>
							<strong>Decoupled Pipelines:</strong> Implements asynchronous prompt
							routing patterns, making the core blogging platform modern and
							AI-augmented.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "🔐 5. Robust Identity Management & SMTP Verification",
			content: (
				<>
					<p>
						Features a production-grade authentication system protecting user records,
						isolating sessions, and validating entry perimeters.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Cryptographic Safety:</strong> User credentials are fully hashed
							using dynamic salt rounds via <code>bcrypt</code> before being committed
							to PostgreSQL, preventing plain-text exposure.
						</li>
						<li>
							<strong>SMTP Email Verification Flow:</strong> Seamless onboarding that
							flags newly created accounts as deactivated. Utilizes{" "}
							<code>nodemailer</code> to dispatch live activation links generated with
							secure <code>uuid</code> strings over automated mail relays.
						</li>
						<li>
							<strong>Advanced Token Dual-Flow:</strong> Signs dynamic JWT tokens.
							Access keys stay ephemeral in client-side memory, while{" "}
							<code>refresh_tokens</code> are bound into high-security HTTP-Only
							cookies to protect against XSS injections.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "🛡️ 6. Fail-Fast Request Validation & Type Safety",
			content: (
				<>
					<p>
						Enforces zero-trust request verification utilizing strict type guards and
						structural validations at the server perimeter.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Layered Protections:</strong> Combines the robust declarative
							matching rules of <code>express-validator</code> middlewares with the
							runtime structural schema processing of <code>zod</code>.
						</li>
						<li>
							<strong>System Resilience:</strong> Badly formed bodies, malicious
							payloads, or illegal request parameters are instantly rejected at the
							boundary level, saving processing threads and keeping the DB safe.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "⚡ 7. Frontend Architecture & Reactive State Engine",
			content: (
				<>
					<p>
						Driven by reactive client states, rendering instantaneous layouts based on
						user access rules and live UI filters.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>MobX Stores:</strong> Centralized domain logic encapsulated
							inside native classes using strict <code>autoBind: true</code>{" "}
							configurations to rule out context leakage. Components are wrapped in{" "}
							<code>observer</code> for granular re-renders.
						</li>
						<li>
							<strong>React Router v7 Layouts:</strong> Utilizes the latest layout
							routing trees to split public entryways from private core feeds safely,
							using parameter-based paths (<code>PostIdPage</code>) to isolate dynamic
							views.
						</li>
						<li>
							<strong>Smart Data Filtering Grid:</strong> Features a client-side
							management hub combining deep substring search queries, dynamic
							select-driven sorting property switches, and live pagination limit
							controls (10/20 items per view).
						</li>
					</ul>
				</>
			),
		},
		{
			title: "🎨 8. Atomic UI Design & Micro-Interactions",
			content: (
				<>
					<p>
						The application avoids heavy third-party UI frameworks in favor of a
						custom-built, highly optimized layout and motion system layer.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Atomic Components:</strong> Encapsulated re-usable building
							blocks (<code>Button</code>, <code>Input</code>, <code>Modal</code>,{" "}
							<code>Loader</code>, <code>Pagination</code>) isolated in a dedicated UI
							folder using CSS Modules and <code>clsx</code>.
						</li>
						<li>
							<strong>Micro-Interactions & Fluid Motion:</strong> Integrated the
							cutting-edge <code>motion</code> (v12) package to control
							hardware-accelerated layouts, fluid hover effects, and prevent layout
							snapping during state changes.
						</li>
						<li>
							<strong>Rich Action Feedback:</strong> Dispatches non-intrusive runtime
							toast alerts across the client workspace using{" "}
							<code>react-hot-toast</code>.
						</li>
					</ul>
				</>
			),
		},
		{
			title: "☁️ 9. DevOps & Environment Isolation",
			content: (
				<>
					<p>
						Configured for reliable continuous hosting using strict environment
						isolation principles.
					</p>
					<ul className={cl.innerList}>
						<li>
							<strong>Cloud Infrastructure:</strong> Deployed as decoupled
							microservices directly on the <strong>Render</strong> cloud platform with
							an automated build pipeline running prisma migrations.
						</li>
						<li>
							<strong>Environment Management:</strong> Powered by <code>dotenv</code>{" "}
							(backend) and <code>import.meta.env</code> (Vite frontend) to safely
							isolate database URIs and CORS origins between production and local
							scopes.
						</li>
					</ul>
				</>
			),
		},
	];

	return (
		<div className={cl.aboutContainer}>
			<div className={cl.aboutCard}>
				<h1 className={cl.aboutTitle}>Project Blueprint & FAQ</h1>
				<p className={cl.aboutSubtitle}>
					Click on any architectural block below to explore technical documentation
					and implementation details.
				</p>

				<div className={cl.faqWrapper}>
					{faqData.map((item, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								key={index}
								className={`${cl.faqItem} ${isOpen ? cl.faqItemOpen : ""}`}
							>
								<button
									className={cl.faqHeader}
									onClick={() => toggleFAQ(index)}
									aria-expanded={isOpen}
								>
									<span className={cl.faqTitle}>{item.title}</span>
									<span className={cl.faqIcon}>{isOpen ? "−" : "+"}</span>
								</button>
								<div className={`${cl.faqBody} ${isOpen ? cl.bodyOpen : ""}`}>
									<div className={cl.faqContent}>{item.content}</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default About;
