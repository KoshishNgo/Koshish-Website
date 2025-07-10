import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const programs = [
	{
		title: "Human Rights",
		image: "/theme/human rights 1.jpeg",
		description:
			"Our Programmes and activities are focused on protection and promotion of Fundamental Rights: Right to Water & Food, Right to Health &Sanitation,Right to Work, Right to Shelter, Right to Clean Air & Environment, Land& Forest Rights, Right to Information, Right to Education, Right to Expression, Right to Culture and Right to Justice.\nURGENT",
	},
	{
		title: "Peace and Harmony",
		image: "/theme/peace and harmony 1.jpeg",
		description:
			"Campaign for promotion of tolerance, peace, communal harmony, fraternity, peaceful resolution of conflict, Constitutional Rights on religion & personal belief, cultural diversity and individual identity is organized. Meetings, seminar, workshop, cultural programmes, puppet show, street plays etc. are programmed",
	},
	{
		title: "Women & Children",
		image: "/theme/women and children 1.jpeg",
		description:
			"Activities are undertaken for better understanding of Constitutional & Fundamental Rights, gender equality, women’s and children’s rights and ending all kinds of violence against women and children.",
	},
	{
		title: "Youth",
		image: "/theme/youth 1.jpeg",
		description:
			"The organization works to enable youth to develop themselves to their potentialities and advocates with the government for youth centered policies. It undertakes research study on aspiration and problems of youth. The organization strives to inculcate ideals of peace, communal harmony and community living and encourage youth to participate in politics and social development.",
	},
	{
		title: "Local Self Governance",
		image: "/theme/local self governance.jpeg",
		description:
			"The organization works for promotion of local self-governance, decentralize planning, resource mobilization, community monitoring and justice at grassroots level.",
	},
	{
		title: "Environment and Sustainable Agriculture",
		image: "/theme/enviroment and sustainable agriculture.jpeg",
		description:
			"Organization’s responsibilities are to take initiatives for protection and conservation of environment, water-bodies, forest, biodiversity and wild life. Initiatives are undertaken for achieving balance between footprint and handprint in regard to sustainable development. We work to provide immediate relief to victims of natural and human induced disasters. We also try to ascertain the causes of calamities and assess its impact on environment, individuals, society and economy",
	},
];

const Events = () => (
	<div className="min-h-screen flex flex-col font-poppins bg-gradient-to-br from-indigo-200 to-purple-200">
		<Navbar />
		<main className="flex-1 flex items-center justify-center py-12">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4">
				<h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 text-center">
					Events
				</h1>
				<p className="text-gray-600 text-center mb-8">
					Our current initiatives making a difference in communities
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{programs.map((p, i) => (
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

export default Events;
