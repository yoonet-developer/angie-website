import type { APIRoute } from 'astro'
import fs from 'fs'
import path from 'path'

export const POST: APIRoute = async ({ request }) => {
  try {
    let data;
    try {
      data = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON data provided' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: fullName, email, phone' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Create submission record with timestamp
    const submission = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      applicantType: data.applicantType,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      additionalMessage: data.additionalMessage,
      // Add type-specific data
      ...(data.applicantType === 'business' ? {
        businessType: data.businessType,
        socialMediaGoals: data.socialMediaGoals,
        currentSocialMediaHandling: data.currentSocialMediaHandling,
        platformPreferences: data.platformPreferences || [],
      } : {
        fieldOfStudy: data.fieldOfStudy,
        socialMediaExperience: data.socialMediaExperience,
        softwareSkills: data.softwareSkills || [],
      })
    };

    // Save to local file (temporary solution)
    const submissionsFile = path.join(process.cwd(), 'form-submissions.json');
    let submissions = [];
    
    try {
      if (fs.existsSync(submissionsFile)) {
        const fileContent = fs.readFileSync(submissionsFile, 'utf8');
        submissions = JSON.parse(fileContent);
      }
    } catch (readError) {
      console.log('Creating new submissions file');
    }
    
    submissions.push(submission);
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
    
    console.log(`💾 Saved ${data.applicantType} application from ${data.fullName}`);

    return new Response(JSON.stringify({ 
      success: true, 
      id: submission.id,
      message: 'Application submitted successfully!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Form submission error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Failed to submit application. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}