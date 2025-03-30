
{ pkgs }: {
  deps = [
    pkgs.python3
    pkgs.python3Packages.tensorflow
    pkgs.python3Packages.opencv4
    pkgs.python3Packages.numpy
    pkgs.libGLU
    pkgs.libGL
  ];
}
