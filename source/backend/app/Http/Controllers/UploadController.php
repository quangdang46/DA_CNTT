<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    //
    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Get the uploaded file
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName, 'public');

        // Generate the public URL
        $fileUrl = asset('storage/' . $filePath);

        return response()->json([
            'message' => 'File uploaded successfully',
            'url' => $fileUrl,
        ]);
    }
}
