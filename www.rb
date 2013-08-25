require 'rack'

builder = Rack::Builder.new do
  use Rack::Lint
  use Rack::CommonLogger
  
  use Rack::Static, :urls => [''], :root => 'www', :index => 'index.html'
  run Proc.new { |env| [ 404, { 'Content-Type'  => 'text/html' }, ['404 - page not found'] ] }
end

Rack::Handler::Thin.run builder, :Port => 9292
