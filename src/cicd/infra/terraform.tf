variable "project_name" {
  description = "Name of the project"
  type        = string
}

resource "null_resource" "slow_file" {
  provisioner "local-exec" {
    command = <<EOT
      echo "Starting long task..."
      sleep 10
      echo "Hello from ${var.project_name}" > ./test-output.txt
      echo "Done."
    EOT
  }

  triggers = {
    always_run = timestamp() # forces recreation each run
  }
}
