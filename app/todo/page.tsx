import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Verified, X } from "lucide-react";

export default function Todo() {
	return (
		<div className="flex flex-col gap-[10px] p-[10px] w-full max-w-[609px]">
			<div className="flex gap-2 flex-col">
				<h1
					className="text-3xl font-bold"
				>
					my-todos ✅
				</h1>

				<div className="flex flex-col gap-2 w-full">
					<div className="flex w-full gap-2">
						<Input
							type="text"
							placeholder="Buy more milk..."
							className="bg-slate-900 border-none"
						/>

						<Button
							className="w-[51px] p-0 bg-slate-900 border-none"
							variant="secondary"
						>
							<Plus color="#F8FAFC" />
						</Button>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex justify-between items-center">
							<p>Purchase milk 🥛</p>
							<div className="flex gap-1">
								<button>
									<Verified color="#F8FAFC" />
								</button>
								<button>
									<X color="#F8FAFC" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
