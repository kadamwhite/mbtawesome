variable do_token {
  default = "0b10b718f70bc73b3ea6e995f689ae3593e695a3423f4dcc8c8faab39b5494a8"
}

provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_ssh_key" "key" {
  name = "tkellen"
  public_key = "${file("~/.ssh/id_rsa.pub")}"
}

resource "digitalocean_droplet" "mbtawesome" {
  image = "ubuntu-14-04-x64"
  name = "mbtawesome"
  region = "nyc2"
  size = "512mb"
  ssh_keys = ["${digitalocean_ssh_key.key.id}"] # this id can't be inferred from the key above, yet
}
