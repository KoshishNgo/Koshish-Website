import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const campaigns = [
	{
		title: "Campaign 1",
		description: "Description for campaign 1",
		image: "https://via.placeholder.com/150",
	},
	{
		title: "Campaign 2",
		description: "Description for campaign 2",
		image: "https://via.placeholder.com/150",
	},
	{
		title: "Campaign 3",
		description: "Description for campaign 3",
		image: "https://via.placeholder.com/150",
	},
	{
		title: "Campaign 4",
		description: "Description for campaign 4",
		image: "https://via.placeholder.com/150",
	},
];

const Campaigns = () => (
	<div className="min-h-screen flex flex-col font-poppins bg-gradient-to-br from-indigo-200 to-purple-200">
		<Navbar />
		<main className="flex-1 flex items-center justify-center py-12">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4">
				<h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 text-center">
					Campaigns
				</h1>
				<p className="text-gray-600 text-center mb-8">
					Our current initiatives making a difference in communities
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{campaigns.map((p, i) => (
						<div
							key={i}
							className="bg-gray-50 border-l-4 border-indigo-400 rounded-xl p-6 shadow hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col items-center"
						>
							<img
								src={p.image}
								alt={p.title}
								className="w-28 h-28 object-cover rounded-lg mb-4 shadow"
							/>
							<h3 className="font-bold text-lg text-gray-800 mb-2 text-center">
								{p.title}
							</h3>
							<p className="text-gray-600 text-sm whitespace-pre-line text-center">
								{p.description}
							</p>
						</div>
					))}
				</div>
				<div className="text-center">
					<a
						href="/"
						className="inline-block px-6 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition"
					>
						← Back to Home
					</a>
				</div>
			</div>
		</main>
		<Footer />
	</div>
);

export default Campaigns;