<?php
require '../dbconfig.php';

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Insert data into contact_form table
   // Insert data into contact_form table
$stmt = $conn->prepare("INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo "Error: " . $conn->error; // Display any SQL query errors
}
$stmt->bind_param("ssss", $name, $email, $subject, $message);
    

    if ($stmt->execute()) {
        echo "<script>alert('Your message has been sent successfully. We will contact you soon.');</script>";
    } else {
        echo "<script>alert('Failed to send the message. Please try again.');</script>";
    }

    $stmt->close();
}

$conn->close();
?>
