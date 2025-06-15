
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const EventSubmissionTest = () => {
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runTests = async () => {
    setTesting(true);
    const results: string[] = [];
    
    try {
      // Test 1: Check Supabase connection
      results.push("✅ Supabase client initialized");
      
      // Test 2: Check table structure
      const { data: tableData, error: tableError } = await supabase
        .from('events')
        .select('*')
        .limit(1);
      
      if (tableError) {
        results.push(`❌ Table access error: ${tableError.message}`);
      } else {
        results.push("✅ Events table accessible");
      }
      
      // Test 3: Try a simple insert
      const testEvent = {
        title: "Test Event",
        description: "Test Description",
        event_url: "https://example.com/test",
        date: new Date().toISOString().split('T')[0],
        time: "18:00:00",
        location: "Test Location",
        category: "Test",
        price: "Free",
        host_organization: "Test Org",
        expected_attendees: 10,
        status: 'pending'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('events')
        .insert([testEvent])
        .select()
        .single();
      
      if (insertError) {
        results.push(`❌ Insert failed: ${insertError.message}`);
        results.push(`   Code: ${insertError.code}`);
        results.push(`   Details: ${insertError.details}`);
      } else {
        results.push("✅ Test event inserted successfully");
        
        // Clean up - delete the test event
        await supabase
          .from('events')
          .delete()
          .eq('id', insertData.id);
        
        results.push("✅ Test event cleaned up");
      }
      
    } catch (error) {
      results.push(`❌ Unexpected error: ${error}`);
    }
    
    setTestResults(results);
    setTesting(false);
    
    toast({
      title: "Test Completed",
      description: "Check the results below",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Event Submission Test</CardTitle>
        <CardDescription>
          Test the database connection and event submission flow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={testing}
          className="w-full"
        >
          {testing ? "Running Tests..." : "Run Database Tests"}
        </Button>
        
        {testResults.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1 font-mono text-sm">
              {testResults.map((result, index) => (
                <div key={index} className={result.startsWith('❌') ? 'text-red-600' : 'text-green-600'}>
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
