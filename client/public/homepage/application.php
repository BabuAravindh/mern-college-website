<?php
if(isset($_POST['submit'])) {
    include('../fpdf/fpdf.php');
    $pdo = new PDO('mysql:host=localhost;dbname=college;charset=utf8', 'root', '');

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $whatsapp = $_POST['whatsapp'];
    $address = $_POST['Address'];
    $gender = $_POST['gender'];
    $dob = $_POST['dob'];
    $aadhar_no = $_POST['aadhar-no'];
    $nationality = $_POST['nationality'];
    $degree = $_POST['degree'];
    $university = $_POST['university'];
    $grad_year = $_POST['grad_year'];
    $percentage = $_POST['Percentage'];
    $program = $_POST['program'];
    $photo_file = $_FILES['photo-file']['tmp_name'];
    $signature_file = $_FILES['signature-file']['tmp_name'];

    // Generate unique application number
    $timestamp = time();
    $random_number = rand(10000, 99999);
    $application_no = "PG-" . date("YmdHis", $timestamp) . "-" . $random_number;

    // Create PDF object
    $pdf = new FPDF();
    $pdf->AddPage();

    // Set font and size
    $pdf->SetFont('Arial','B',16);

    // Add photo section
    $pdf->SetFont('Arial','B',14);
    $pdf->Cell(0,10,'Photo',0,1);
    $pdf->SetFont('Arial','',12);
    // Set photo position to top center
    $pdf->SetXY(($pdf->GetPageWidth() - 50) / 2, 20); // Adjust the Y-coordinate as needed
    // Add photo cell
    $photo_type = exif_imagetype($photo_file);
    if ($photo_type && ($photo_type == IMAGETYPE_JPEG || $photo_type == IMAGETYPE_PNG || $photo_type == IMAGETYPE_GIF)) {
        $image = imagecreatefromstring(file_get_contents($photo_file));
        $temp_photo_file = 'temp_photo.' . image_type_to_extension($photo_type);
        if ($photo_type == IMAGETYPE_JPEG) {
            imagejpeg($image, $temp_photo_file);
        } elseif ($photo_type == IMAGETYPE_PNG) {
            imagepng($image, $temp_photo_file);
        } elseif ($photo_type == IMAGETYPE_GIF) {
            imagegif($image, $temp_photo_file);
        }
        $pdf->Image($temp_photo_file, $pdf->GetX(), $pdf->GetY(), 50);
        unlink($temp_photo_file); // Delete the temporary file
    } else {
        $pdf->Cell(0,10,'Invalid photo format',0,1);
    }

    // Add personal information section
    $pdf->Ln(10);
    $pdf->SetFont('Arial','B',14);
    $pdf->Cell(0,10,'Personal Information',0,1);
    $pdf->SetFont('Arial','',12);
    // Add remaining personal information cells
    $pdf->Cell(0,10,'Name: '.$name,0,1);
    $pdf->Cell(0,10,'Email: '.$email,0,1);
    $pdf->Cell(0,10,'Phone: '.$phone,0,1);
    $pdf->Cell(0,10,'WhatsApp: '.$whatsapp,0,1);
    $pdf->Cell(0,10,'Address: '.$address,0,1);
    $pdf->Cell(0,10,'Gender: '.$gender,0,1);
    $pdf->Cell(0,10,'Date of Birth: '.$dob,0,1);
    $pdf->Cell(0,10,'Aadhar Number: '.$aadhar_no,0,1);
    $pdf->Cell(0,10,'Nationality: '.$nationality,0,1);

    // Add education section
    $pdf->Ln(10);
    $pdf->SetFont('Arial','B',14);
    $pdf->Cell(0,10,'Education',0,1);
    $pdf->SetFont('Arial','',12);
    // Add remaining education cells
    $pdf->Cell(0,10,'Degree: '.$degree,0,1);
    $pdf->Cell(0,10,'University: '.$university,0,1);
    $pdf->Cell(0,10,'Graduation Year: '.$grad_year,0,1);
    $pdf->Cell(0,10,'Percentage: '.$percentage,0,1);
    $pdf->Cell(0,10,'Program: '.$program,0,1);

    // Add signature section
    $pdf->Ln(10);
    $pdf->SetFont('Arial','B',14);
    $pdf->Cell(0,10,'Signature',0,1);
    $pdf->SetFont('Arial','',12);
    // Set signature position to bottom left
    $pdf->SetXY(10, $pdf->GetPageHeight() - 30);
    // Add signature cell
    if ($signature_file) {
        $signature_type = exif_imagetype($signature_file);
        if ($signature_type && ($signature_type == IMAGETYPE_JPEG || $signature_type == IMAGETYPE_PNG || $signature_type == IMAGETYPE_GIF)) {
            $image = imagecreatefromstring(file_get_contents($signature_file));
            $temp_signature_file = 'temp_signature.' . image_type_to_extension($signature_type);
            if ($signature_type == IMAGETYPE_JPEG) {
                imagejpeg($image, $temp_signature_file);
            } elseif ($signature_type == IMAGETYPE_PNG) {
                imagepng($image, $temp_signature_file);
            } elseif ($signature_type == IMAGETYPE_GIF) {
                imagegif($image, $temp_signature_file);
            }
            $pdf->Image($temp_signature_file, $pdf->GetX(), $pdf->GetY(), 50, 20);
            unlink($temp_signature_file); // Delete the temporary file
        } else {
            $pdf->Cell(0,10,'Invalid signature format',0,1);
        }
    } else {
        $pdf->Cell(0,10,'Applicant Signature: ____________________________',0,1);
    }

    // Output PDF
    $pdf_path = '../application_forms/'.$application_no.'.pdf';
    $pdf->Output('F', $pdf_path);

    // Save application details to database
    $pdf_data = file_get_contents($pdf_path);
    $stmt = $pdo->prepare("INSERT INTO pg_application_form (application_no, pdf) VALUES (?, ?)");
    $stmt->bindParam(1, $application_no);
    $stmt->bindParam(2, $pdf_data, PDO::PARAM_LOB);
    $stmt->execute();

    echo "Application submitted successfully. Your application number is: ".$application_no;
}
?>
