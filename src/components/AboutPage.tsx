
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Target, Heart, Mail, MessageCircle } from "lucide-react";

const AboutPage = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former VP of Growth at a NYC unicorn. Built and scaled communities for 8+ years.",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Sarah Kim",
      role: "Head of Content",
      bio: "Ex-journalist turned startup storyteller. Covered NYC tech for TechCrunch and Axios.",
      image: "photo-1494790108755-2616b612b632"
    },
    {
      name: "Marcus Rodriguez",
      role: "Community Manager",
      bio: "Serial entrepreneur and angel investor. Active in NYC startup ecosystem for 10+ years.",
      image: "photo-1507003211169-0a1dd7228f2d"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Community Members" },
    { number: "200+", label: "Events This Year" },
    { number: "1,500+", label: "Job Connections" },
    { number: "100+", label: "Partner Companies" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">About NYC Startup Hub</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building NYC's most connected startup community. Our mission is to help founders, 
            developers, and innovators discover opportunities, build relationships, and scale their ventures.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              NYC is home to incredible innovation, but the startup ecosystem can feel fragmented. 
              We believe that when founders, talent, and resources connect more easily, the entire 
              ecosystem thrives.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              That's why we've built a platform that brings together the best events, job opportunities, 
              and insights from across NYC's startup landscape - all in one place.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">What We Believe</h2>
            </div>
            <ul className="space-y-4 text-gray-600 text-lg">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <span>Great startups are built through community and collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                <span>Access to opportunities should be democratized, not gatekept</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                <span>Diverse perspectives drive innovation and better outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-3 flex-shrink-0"></div>
                <span>Success stories should be shared to inspire the next generation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
            </div>
            <p className="text-lg text-gray-600">
              We're a small but passionate team of startup veterans who love building community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${member.image}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Everything we do is designed to strengthen NYC's startup community. We measure 
                  success by the connections made and opportunities created, not just metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Quality Over Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We curate the best events, jobs, and content rather than overwhelming you with noise. 
                  Our community values substance and meaningful interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Great opportunities shouldn't be locked behind expensive memberships or exclusive networks. 
                  We keep our core services free and accessible to all.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're open about how we operate, who we partner with, and how we make money. 
                  Trust is the foundation of any strong community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl mb-6 opacity-90">
                Have questions, feedback, or want to partner with us? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mail className="mr-2 h-5 w-5" />
                  hello@nycstartuphub.com
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join Our Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
