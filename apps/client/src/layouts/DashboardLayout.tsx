import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { themeContext } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { theme, toggleTheme } = useContext(themeContext);
	const location = useLocation();
	const navigate = useNavigate();

	// Build breadcrumb items from pathname
	const pathSegments = location.pathname.split("/").filter((p) => p !== "");

	// Create breadcrumb items with proper paths
	const breadcrumbItems = pathSegments
		.map((segment, index) => {
			// Build the full path up to this segment
			const path = "/" + pathSegments.slice(0, index + 1).join("/");

			// Capitalize and format the label
			let label = segment.charAt(0).toUpperCase() + segment.slice(1);

			// Handle special cases for better labels
			if (segment === "workflow" && index < pathSegments.length - 1) {
				// Skip the "workflow" segment if it's followed by an ID
				return null;
			}

			// If this looks like an ID (long alphanumeric), use a more friendly label
			if (segment.length > 15 && /^[a-f0-9-]+$/i.test(segment)) {
				const previousSegment = pathSegments[index - 1];
				if (previousSegment === "workflow") {
					label = "Workflow Details";
				} else {
					label = "Details";
				}
			}

			return {
				label,
				path,
				isLast: index === pathSegments.length - 1,
			};
		})
		.filter(
			(item): item is { label: string; path: string; isLast: boolean } =>
				item !== null,
		);

	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<main className="w-full">
				<div className="flex items-center justify-between p-4 border-b border-border bg-background">
					<div className="flex items-center gap-4">
						<SidebarTrigger />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbItems.map((item, i) =>
									!item.isLast ? (
										<>
											<BreadcrumbItem key={i}>
												<BreadcrumbLink href={item.path}>
													{item.label}
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
										</>
									) : (
										<BreadcrumbItem key={i}>
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										</BreadcrumbItem>
									),
								)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="flex items-center gap-4">
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={() => toggleTheme()}
							className="border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors rounded-lg p-2 border"
						>
							{theme === "light" ? (
								<Moon className="w-4 h-4" />
							) : (
								<Sun className="w-4 h-4" />
							)}
						</motion.button>
						<Button
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/signin");
							}}
							size="sm"
							variant="outline"
							className="border-border"
						>
							Sign Out
						</Button>
						<div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-secondary-foreground font-bold text-sm">
							U
						</div>
					</div>
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}