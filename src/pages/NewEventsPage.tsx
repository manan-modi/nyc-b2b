
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SimpleSubmitEventDialog } from "@/components/SimpleSubmitEventDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, Clock } from "lucide-react";

const NewEventsPage = () => {
  const handleJoinCommunity = () => {
    window.open('https://nycb2b.beehiiv.com', '_blank');
  };

  return (
    <>
      <SEOHead 
        title="Submit New Events - NYC B2B Community"
        description="Submit your B2B event to be featured in our NYC professional community calendar. Share networking events, conferences, and meetups."
      />
      
      <div className="min-h-screen bg-white">
        <Navigation onJoinCommunityClick={handleJoinCommunity} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Submit New Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Share your B2B event with the NYC professional community. Submit your event URL below and our team will review it for inclusion in our curated calendar.
            </p>
            
            <div className="flex justify-center mb-8">
              <SimpleSubmitEventDialog />
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Event Types We Feature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Networking meetups and mixers</li>
                  <li>• Industry conferences and summits</li>
                  <li>• Professional workshops and seminars</li>
                  <li>• Startup and investor events</li>
                  <li>• Tech talks and panel discussions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Submission Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Must be relevant to NYC B2B professionals</li>
                  <li>• Event should provide clear value to attendees</li>
                  <li>• Include complete event details in your listing</li>
                  <li>• Events are typically reviewed within 24-48 hours</li>
                  <li>• We reserve the right to decline inappropriate submissions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Popular Event Platforms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lu.ma events</li>
                  <li>• Eventbrite listings</li>
                  <li>• Meetup.com events</li>
                  <li>• LinkedIn events</li>
                  <li>• Custom event pages</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Our team reviews your submission</li>
                  <li>• We may add additional event details</li>
                  <li>• Approved events appear in our calendar</li>
                  <li>• Events are promoted to our community</li>
                  <li>• You'll be notified of the status</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Share Your Event?
            </h2>
            <p className="text-gray-600 mb-6">
              Join hundreds of other event organizers who trust us to promote their NYC B2B events.
            </p>
            <SimpleSubmitEventDialog />
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default NewEventsPage;
